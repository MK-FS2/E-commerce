
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
}
})


export default DevConfigs