pipeline {
    agent {
        node {
            label 'qa-infra-node'
        }
    }
    tools {
        allure 'AllureV2'
    }

    environment {
        BASE_URL_SBX = 'https://caseywindhorst-isss-test.terradotta.com/index.cfm'
        DASHBOARD_URL_SBX = 'https://caseywindhorst-isss-test.terradotta.com/index.cfm?' +
                    'FuseAction=SEVIS.ISSSStudentList#/students-list'
        BASE_URL_DEV_OSWALD = 'https://dev-schlmigration1-oswald.terradotta.com/index.cfm'
        DASHBOARD_URL_DEV_OSWALD = 'https://dev-schlmigration1-oswald.terradotta.com/index.cfm?' +
                'FuseAction=SEVIS.ISSSStudentList#/students-list'
        BASE_URL_OSWALD = 'https://prod-projects2-oswald.terradotta.com'
        DASHBOARD_URL_OSWALD = 'https://prod-projects2-oswald.terradotta.com/index.cfm?' +
            'FuseAction=SEVIS.ISSSStudentList#/students-list'

        reportPath = "${WORKSPACE}/reports/playwright"
        imageTag = 'playwright-ui-automation'
        containerId = ''
        ALLURE_RESULTS = "${WORKSPACE}/allure-results"
        ALLURE_CMD = '/var/lib/jenkins/agent/tools/ru.yandex.qatools.allure.jenkins.tools.' +
                 'AllureCommandlineInstallation/AllureV2/bin/allure'
    }

    stages {
        stage('Verify Allure Installation') {
            steps {
                script {
                    sh "${env.ALLURE_CMD} --version || echo 'Failed to execute Allure'"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dir('playwright/playwrightISSS') {
                        sh "sudo docker build --build-arg ENV_TYPE=docker -t ${env.imageTag} ."
                    }
                }
            }
        }

        stage('Start Docker Container') {
            steps {
                script {
                    containerId = sh(script: "sudo docker run -d ${env.imageTag}", returnStdout: true).trim()
                }
            }
        }

        stage('Run Tests in Docker') {
            steps {
                script {
                    runTestsInDocker()
                    sh 'sleep 50'
                }
            }
        }

        stage('Copy Reports from Container') {
            steps {
                script {
                    sh "mkdir -p ${env.ALLURE_RESULTS}"
                    sh "sudo docker exec ${containerId} ls -l /app/allure-results"
                    sh "sudo docker cp ${containerId}:/app/allure-results/. ${env.ALLURE_RESULTS}"
                    sh "ls -l ${env.ALLURE_RESULTS}"
                }
            }
        }

        stage('Verify Reports Existence and Generate Report') {
            steps {
                script {
                    echo 'Checking Results...'
                    sh "ls -lR ${env.WORKSPACE}/allure-results"
                    // sh "chmod -R 755 ${env.ALLURE_RESULTS}"
                    // sh "chown -R jenkins:jenkins ${env.ALLURE_RESULTS}"
                    sh "ls -l ${env.ALLURE_RESULTS}/*"

                    if (fileExists("${env.WORKSPACE}/allure-results/")) {
                        echo 'Generating Allure Report...'
                        sh "\${ALLURE_CMD} generate ${env.ALLURE_RESULTS} -o ${env.WORKSPACE}/allure-report --clean"
                        allure([
                            includeProperties: false,
                            jdk: '',
                            results: [[path: "${env.WORKSPACE}/allure-report"]]
                        ])
                    } else {
                        echo 'No allure results found to generate reports.'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh "sudo docker stop ${containerId}"
            sh "sudo docker rm ${containerId}"
            sh "sudo docker rmi ${env.imageTag} || echo 'Image already removed or never existed'"
            cleanWs()
        }
    }
}

def runTestsInDocker() {
    try {
        containerId = sh(script: """sudo docker run -d \
                -e BASE_URL_SBX='${env.BASE_URL_SBX}' \
                -e DASHBOARD_URL_SBX='${env.DASHBOARD_URL_SBX}' \
                -e BASE_URL_DEV_OSWALD='${env.BASE_URL_DEV_OSWALD}' \
                -e DASHBOARD_URL_DEV_OSWALD='${env.DASHBOARD_URL_DEV_OSWALD}' \
                -e BASE_URL_OSWALD='${env.BASE_URL_OSWALD}' \
                -e DASHBOARD_URL_OSWALD='${env.DASHBOARD_URL_OSWALD}' \
                -e USERNAME_CASEY='${env.USERNAME_CASEY}' \
                -e PASSWORD_CASEY='${env.PASSWORD_CASEY}' \
                ${env.imageTag}""", returnStdout: true).trim()

        echo 'PRINT ENVIRONMENT VARIABLES:'
        sh "sudo docker exec ${containerId} printenv"

        sh "sudo docker exec ${containerId} npx playwright test --project=sbx-chromium --reporter=allure-playwright"
    } catch (Exception e) {
        echo 'Tests failed, but the pipeline will continue to publish the reports.'
    }
}
