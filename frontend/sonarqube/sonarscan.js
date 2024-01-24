// const scanner = require('sonarqube-scanner');
import scanner from 'sonarqube-scanner'
import process from 'process';

scanner(
    {
        serverUrl: 'http://localhost:9000',
        login: "sqp_ce8ae07f43f1eba00316deca18ddb47ad59e658b",
        options: {
            'sonar.projectName': 'ezmark-frontend',
            'sonar.projectDescription': 'ezmark is an managemenet system that manages attendance and the students',
            'sonar.projectKey': 'sonarqube-ezmark',
            'sonar.projectVersion': '0.0.2',
            'sonar.sources': 'src',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)