def app_name="webclip-web"

def project_version
def project_branchName

def setStatus(status, app_name){
    def m = '{"state": "'+status+'","context": "continuous-integration/jenkins", "description": "Jenkins", "target_url": "https://jks.xh-network.xyz/job/'+app_name+'/'+env.BUILD_NUMBER+'/console"}'
    m = m.replaceAll("\"", "\\\\\"")
    msg = "curl -i -s \"https://api.GitHub.com/repos/$GITHUB_CREDENTIALS_USR/$app_name/statuses/$GIT_COMMIT\" -H \"Authorization: token $GITHUB_CREDENTIALS_PSW\" -H \"Content-Type: application/json\" -X POST -d \"$m\""
    sh msg
}

pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS=credentials('dockerhub-id')
        GITHUB_CREDENTIALS=credentials('github-id')
        DEPLOY_CREDENTIALS=credentials('ssh-deployment')
    }

    stages {
        stage('Init') {
            environment {
                C_VERSION = sh(returnStdout: true, script: 'cat build.sbt | grep -E "^.*version.*$" | sed -e "s/.*\"version\"[ ]*:[ ]*\"\\(.*\\)\"[ ]*,.*$/\1/g"').trim()
                branchName= sh (returnStdout: true, script: 'echo $GIT_BRANCH').trim()
                commitId= sh (returnStdout: true, script: 'echo $GIT_COMMIT').trim()
            }
            steps {
                script {
                    sh 'printenv'
                    setStatus("pending", app_name)
                    project_version = sh(returnStdout: true, script: 'echo $C_VERSION')
                    echo "project_version: $project_version"
                    project_branchName = env.branchName
                }
            }
        }
        stage('Build') {
            environment {
                branchName= sh (returnStdout: true, script: 'echo $GIT_BRANCH').trim()
                commitId= sh (returnStdout: true, script: 'echo $GIT_COMMIT').trim()
            }
            when { expression { return env.GIT_BRANCH == 'origin/master'}}
            steps {
                sh "docker build -t xethhung/$app_name:latest ."
                echo 'build complete'
            }
        }
        stage('Publish') {
            when { expression { return env.GIT_BRANCH == 'origin/master'}}
            steps {
                sh 'printenv'
                sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                sh "docker push $DOCKERHUB_CREDENTIALS_USR/$app_name:latest"
                echo "project_version: $project_version"
                sh "docker tag $DOCKERHUB_CREDENTIALS_USR/$app_name:latest $DOCKERHUB_CREDENTIALS_USR/$app_name:$project_version"
                sh "docker push $DOCKERHUB_CREDENTIALS_USR/$app_name:$project_version"
            }
        }
        stage('Deploy') {
//             when { expression { return env.GIT_BRANCH == 'origin/master'}}
            when {expression { return false }}
            steps {
                withCredentials([string(credentialsId: 'deployment-host', variable: 'host')]) {
                    sshagent(credentials: ['ssh-deployment']){
                        sh "ssh -i /ssh/id_rsa $DEPLOY_CREDENTIALS_USR@$host /data/webclip2-server/refresh.sh"
                    }
                }
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
        success {
            setStatus("success", app_name)
        }
        failure {
            setStatus("failure", app_name)
        }
    }
}
