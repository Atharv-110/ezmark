import scanner from 'sonarqube-scanner'
import process from 'process';

scanner(
    {
        serverUrl: 'http://localhost:9000',
        login: "sqp_942b01782ddc3327fc5463abd078a705226b7b22",
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