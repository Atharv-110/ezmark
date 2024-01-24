// const scanner = require('sonarqube-scanner');
import scanner from 'sonarqube-scanner'
import process from 'process';

scanner(
    {
        serverUrl: 'http://localhost:9000',
        login: "sqp_811f39ab83cf0544d977d2773b78c38b76ae51ef",
        options: {
            'sonar.projectName': 'ezmark-frontend',
            'sonar.projectDescription': 'ezmark is an managemenet system that manages attendance and the students',
            'sonar.projectKey': 'sonarqube-ezmark',
            'sonar.projectVersion': '0.0.1',
            'sonar.sources': 'src',
            'sonar.exclusions': '',
            'sonar.sourceEncoding': 'UTF-8',
        }
    },
    () => process.exit()
)