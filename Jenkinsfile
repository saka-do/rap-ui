pipeline {
    agent any

    environment {
        ANGULAR_DIR = './rap-angular'                  // Path to your Angular project
        DIST_DIR = './rap-angular/dist/rap-angular/browser'    // Build directory
        SIT_SERVER = 'ubuntu@13.233.100.95' // SIT Server address
        SIT_PATH = '/var/www/rap-ui/'            // Path where app will be deployed on SIT server
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub
                git branch: 'main', url: 'https://github.com/saka-do/rap-ui.git', credentialsId: 'github-pat'
            }
        }


        stage('Install Dependencies') {
            steps {
                // clear previos cache and build
                
                // Install the dependencies for the Angular app
                dir("${env.ANGULAR_DIR}") {
                    sh """rm -rf node_modules package-lock.json
                        npm cache clean --force                 
                        npm install"""                       
                }
            }
        }

        stage('Build Angular App') {
            steps {
                // Build the Angular project for production
                dir("${env.ANGULAR_DIR}") {
                    sh 'ng build' 
                }
            }
        }

        stage('Deploy to SIT') {
            steps {
                input message: 'Deploy the latest build to SIT?', ok: 'Deploy Now'
                echo "Deploying to SIT server..."
                // Clean the SIT server's deploy directory
                sh """
                    ssh ${env.SIT_SERVER} 'rm -rf ${env.SIT_PATH}*'
                    scp -r ${env.DIST_DIR}/* ${env.SIT_SERVER}:${env.SIT_PATH}
                """
            }
        }
    }

    post {
        always {
            // Clean up the workspace after each build
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
