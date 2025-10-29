
const DevConfigs = ()=>
(
{
Port:process.env.PORT,
DB:
{
DBURL:process.env.URL
},
Cloud:
{
CloudName:process.env.CloudName,
CloudAPIKey:process.env.CloudApiKey,
Cloudsecret:process.env.CloudSecret
},
Email:
{
EMAILPASS:process.env.EMAILPASS,
EMAILUSER:process.env.EMAILUSER
}

})


export default DevConfigs