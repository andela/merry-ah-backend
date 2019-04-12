pipeline {
    agent any

    environment {
        DB_USERNAME='chidinmaezekwe'
        DB_PASSWORD='null'
        DBNAME='art_cave_test'
    }

    tools {
        nodejs "nodeJS"
    }


    stages {
        stage('Setup Postgres for Test_DB') {
            steps {
                sh 'sudo apt-get install -y postgresql postgresql-contrib libpq-dev python-psycopg2'
                sh 'sudo su - postgres'
                sh 'psql -c \'drop database if exists art_cave_test;\' -U postgres'
                sh 'psql -c \'create database art_cave_test;\' -U postgres'
                sh 'psql -c "CREATE USER chidinmaezekwe WITH PASSWORD \'null\';" -U postgres'
                sh 'npm run db:migrate'
            }
        }


        stage('Clone repo') {
            steps {
                git branch: 'demo',  url: 'https://github.com/andela/merry-ah-backend'
            }
        }


        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }


        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }
    }
}
