import AWS from 'aws-sdk';

export function uploadS3(file) {
    return new Promise((resolve, reject) => {
        const REGION = process.env.REACT_APP_REGION;
        const ACCESS_KEY_ID = process.env.REACT_APP_S3_ACCESS_KEY_ID;
        const SECRET_ACCESS_KEY_ID = process.env.REACT_APP_S3_SECRET_ACCESS_KEY_ID;

        AWS.config.update({
            region: REGION,
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY_ID,
        });

        const s3 = new AWS.S3();
        const params = {
            ACL: 'public-read',
            Bucket: 'excel', // 버킷 이름
            Key: `${file.name}`, // 파일 경로와 이름
            Body: file,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.log('Error uploading file:', err);
                reject(err);
            } else {
                console.log('Successfully uploaded file.', data);
                resolve(data.Location); // 업로드된 파일의 URL 반환
            }
        });
    });
}


