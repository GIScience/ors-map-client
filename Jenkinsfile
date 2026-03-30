pipeline {
    agent { label 'worker' }
    stages {
        stage('Prepare Config') {
            steps {
                sh '''
                    echo "foo"
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
                        if (env.BRANCH_NAME ==~ /(^heal-at-scale$)/) {
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
}
