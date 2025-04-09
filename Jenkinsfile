pipeline {
    agent any

    environment {
        ANGULAR_DIR = './rap-angular'
        EC2_USER = "ubuntu"
        SIT_SERVER = "ubuntu@ec2-3-6-160-180.ap-south-1.compute.amazonaws.com"
        SIT_PATH = "/var/www/rap-frontend/*"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/saka-do/rap-ui.git', credentialsId: 'github-pat'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${env.ANGULAR_DIR}") {
                    bat 'npm cache clean --force'
                    bat 'npm install'
                }
            }
        }

        stage('Build Rap') {
            steps {
                 dir("${env.ANGULAR_DIR}") {
                    bat 'npm run build'
                 }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    input message: "Deploy to EC2?", ok: "Deploy Now"
                    bat """
                        ssh ${env.SIT_SERVER} 'sudo rm -rvf ${env.SIT_PATH}*'
                        scp -r ${env.DIST_DIR}/* ${env.SIT_SERVER}:${env.SIT_PATH}
                    """
                }
            }
        }
    }

     post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}