pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo "Building for Staging environment"
                        // Add your build steps for staging here
                        // Example:
                        // sh 'build-staging.sh'
                    } else if (env.BRANCH_NAME ==~ /^release-*/) {
                        echo "Building for Production environment"
                        // Add your build steps for production here
                        // Example:
                        // sh 'build-production.sh'
                    } else {
                        echo "Skipping build for branch: ${env.BRANCH_NAME}"
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    tag pattern: "v*", comparator: "GLOB"
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo "Deploying to Staging environment"
                        // Add your deployment steps for staging here
                        // Example:
                        // sh 'deploy-staging.sh'
                    } else if (env.TAG_NAME) {
                        echo "Deploying to Production environment"
                        // Add your deployment steps for production here
                        // Example:
                        // sh 'deploy-production.sh'
                    } else {
                        echo "Skipping deployment for branch: ${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
    post {
        always {
            echo "Cleaning up workspace"
            cleanWs()
        }
    }
}
