pipeline {
    agent { label 'worker' }
    stages {
        stage('Prepare Config') {
            environment {
                HEAL_API_KEY = credentials('heal-map-client-api-key')
            }
            steps {
                sh '''
                    cd src
                    cp config-examples/* config
                    for i in config/*-example.js; do mv -- "$i" "${i%-example.js}.js"; done
                    sed -i "s|orsApiKey: 'put-here-an-ors-api-key'.*|orsApiKey: '${HEAL_API_KEY}',|" config/app-config.js
                '''
            }
        }
        stage('Build Container Image') {
            steps {
                script {
                    docker.withRegistry('https://repo.heigit.org', 'docker-heigit-ci-service') {
                        dockerImage = docker.build('heigit/heal-map-client:latest')
                        dockerImage.push()
                        helperImage = docker.build('heigit/heal-map-client-helper-geojson-import:latest', '-f ./helper-img/Dockerfile ./helper-img')
                        helperImage.push()
                    }
                }
            }
        }
    }
}
