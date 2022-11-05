import 'dotenv/config' 
let aws_keys = {
    s3: {
        region: 'us-east-1',
        accessKeyId: process.env.S3_ACCKEY ,
        secretAccessKey: process.env.S3_SACCKEY,
        //apiVersion: '2006-03-01',
    },
    rekognition: {
        region: 'us-east-1',
        accessKeyId: process.env.REK_ACCKEY,
        secretAccessKey: process.env.REK_SACCKEY 
    },
    cognito:{
        UserPoolId: process.env.COG_USER,
        ClientId: process.env.COG_CLIENT
    }
}
export default aws_keys