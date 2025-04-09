pipeline {
    agent any

    environment {
        EC2_USER = "ubuntu"
        SIT_SERVER = "ubuntu@ec2-3-6-160-180.ap-south-1.compute.amazonaws.com"
        SIT_PATH = "/var/www/frontend"
    }

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/angular-frontend-repo.git', credentialsId: 'github-pat'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    npm cache clean --force
                    npm install
                '''
            }
        }

        stage('Build Rap') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    input message: "Deploy to EC2?", ok: "Deploy Now"
                    bat """
                        ssh ${env.SIT_SERVER} 'rm -rf ${env.SIT_PATH}*'
                        scp -r ${env.DIST_DIR}/* ${env.SIT_SERVER}:${env.SIT_PATH}
                        scp -r dist/* ${EC2_USER}@${EC2_HOST}:${EC2_PATH}
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