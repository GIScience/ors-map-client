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
            environment {
                IMAGE_TAG = "${env.TAG_NAME ? env.TAG_NAME : 'latest'}"
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-heigit-ci-service', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'docker login -p $PASSWORD -u $USERNAME repo.heigit.org'
                }
                sh '''
                echo $IMAGE_TAG
                docker build -t repo.heigit.org/heigit/heal-map-client:${IMAGE_TAG} .
                docker push repo.heigit.org/heigit/heal-map-client:${IMAGE_TAG}
                docker build -t repo.heigit.org/heigit/heal-map-client-helper-geojson-import:${IMAGE_TAG} -f ./helper-img/Dockerfile ./helper-img
                docker push repo.heigit.org/heigit/heal-map-client-helper-geojson-import:${IMAGE_TAG}
                '''
            }
        }
    }
}
