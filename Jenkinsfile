pipeline {
    agent any

    environment {
        ANGULAR_DIR = './rap-angular'
        DIST_DIR = 'dist'
        SIT_SERVER = 'ubuntu@ec2-51-20-69-200.eu-north-1.compute.amazonaws.com'
        SIT_PATH = '/var/www/rap-frontend/'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/saka-do/rap-ui.git', credentialsId: 'github-pat'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${env.ANGULAR_DIR}") {
                    sh """rm -rf node_modules package-lock.json
                        npm cache clean --force
                        npm install"""
                }
            }
        }

        stage('Build Angular App') {
            steps {
                dir("${env.ANGULAR_DIR}") {
                    sh 'ng build'
                }
            }
        }

        stage('Manual Deployment Approval') {
            steps {
                input message: 'Deploy latest build to SIT?', ok: 'Deploy Now'
            }
        }

        stage('Deploy to SIT') {
            steps {
                echo "Deploying to SIT server..."
                sh """
                    ssh ${env.SIT_SERVER} 'rm -rf ${env.SIT_PATH}*'
                    scp -r ${env.DIST_DIR}/your-app-name/* ${env.SIT_SERVER}:${env.SIT_PATH}
                """
            }
        }
    }
}