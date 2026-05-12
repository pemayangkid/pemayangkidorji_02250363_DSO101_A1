pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        DOCKERHUB_USER = 'pemayd'
        IMAGE_TAG = '02250363'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-creds',
                    url: 'https://github.com/pemayangkid/pemayangkidorji_02250363_DSO101_A1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('backend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
            post {
                always {
                    junit 'backend/junit.xml'
                }
            }
        }

        stage('Deploy - Build & Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                        def backendImage = docker.build(
                            "${DOCKERHUB_USER}/be-todo:${IMAGE_TAG}",
                            './backend'
                        )
                        backendImage.push()
                        backendImage.push('latest')
                    }
                }
            }
        }

    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs above.'
        }
    }
}