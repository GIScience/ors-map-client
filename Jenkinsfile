pipeline {
    agent { label 'worker' }
    stages {
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
