pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Etapa build no disponible'
            }
        }
        stage('Test') {
            steps {
                echo 'Etapa test no disponible'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }
}
