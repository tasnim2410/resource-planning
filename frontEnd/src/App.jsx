//import SideBar from "./SideBar"
//import SideBar2 from "./SideBar2"
import Header from "./Header"
import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client';
function App() {

  async function getReportInGroup() {
    const response = await fetch('https://api.powerbi.com/v1.0/myorg/groups/994434c4-d12f-4635-b106-8083d442db22/reports/16c6947f-2e64-4f86-8816-c7239bf8b682', {
        method: 'GET',
        headers : {
         ' Content-Type' : 'application/json',
          'Authorization' :' Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCIsImtpZCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjA0ZjFhOTYtY2JlOC00M2Y4LWFiYmYtZjhlYWY1ZDg1NzMwLyIsImlhdCI6MTcyNDMzNTExNywibmJmIjoxNzI0MzM1MTE3LCJleHAiOjE3MjQzNDAwMTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUEvMlJBN2Z6TFNDWlZ1b2xDMjdrcDd1dXIvUmtHT1NnVktXc3VKcU1rZWtBRmcwMUd2VzlLZU16dmh5VzFmN0cvMUg4NnUxMVkrb1RXQTV4aWtpbUlQMjMvdkY1TU5zTXpxYTdRbFgydEVXQT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJORUZaSSIsImdpdmVuX25hbWUiOiJUYXNuaW0iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxOTYuMjMxLjEwMy4xMTciLCJuYW1lIjoiVGFzbmltIE5FRlpJIiwib2lkIjoiMzQxNjFlNjYtNzJjZC00OTBkLTljZWYtNmE2Yzg3NzA5ZmIxIiwicHVpZCI6IjEwMDMyMDAzMDlCODhDQjAiLCJyaCI6IjAuQVRvQWxocFBZT2pMLUVPcnZfanE5ZGhYTUFrQUFBQUFBQUFBd0FBQUFBQUFBQUE2QUY0LiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIEl0ZW0uRXhlY3V0ZS5BbGwgSXRlbS5FeHRlcm5hbERhdGFTaGFyZS5BbGwgSXRlbS5SZWFkV3JpdGUuQWxsIEl0ZW0uUmVzaGFyZS5BbGwgT25lTGFrZS5SZWFkLkFsbCBPbmVMYWtlLlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgUmVwcnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLkdpdENvbW1pdC5BbGwgV29ya3NwYWNlLkdpdFVwZGF0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic3ViIjoiQXFZVTdxNk1TUEtGT0NyLU9UV2Q2R3BXWks4N1RFREVVdWtTVXV2TFU1WSIsInRpZCI6IjYwNGYxYTk2LWNiZTgtNDNmOC1hYmJmLWY4ZWFmNWQ4NTczMCIsInVuaXF1ZV9uYW1lIjoidGFzbmltLm5lZnppQGVzcHJpdC50biIsInVwbiI6InRhc25pbS5uZWZ6aUBlc3ByaXQudG4iLCJ1dGkiOiJzWlpZakNYencwR0xTX1AtME9WYkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiOCAxIiwieG1zX3BsIjoiZW4tR0IifQ.NaNBW3DSf-BVXNfixJ9Y7DWuV8IpjQmxPVFVj13W8NvqB_-_QlCksGhvKti_KNnR0y3Il-i2QUBpQOqyxX4JFNxPsUcR0SX7nUfpNRz1oe_SyqF5tgwGz5-owo2Grl4Cng27iQrSrQkPMjMS2a11oLEs3cftawBIk5WZTpXvLDCel2gmgFcJEaqNmyarjZ2dPy-X421hlQ9ZUOpDHz_vCmJcFOWbtqsmVVltFIVjZ3DtHJKrWO2NVFkadQx1wvIJmWGrAv5VORY27wdfvubk9iFSyLIPmyU-hGWsy8RQaTfTu3yP6XZ99f9f9okaVygtjviY1G-poZi1gxpgoxE-Mg'
        }
       
    });

    if (!response.ok) {
        throw new Error('Failed to get report');
    }

    const data = await response.json();
    console.log(data)
    return data.embedUrl.toString(); // Return the new token
}

  async function generateEmbedToken() {
    const response = await fetch('https://api.powerbi.com/v1.0/myorg/groups/994434c4-d12f-4635-b106-8083d442db22/reports/16c6947f-2e64-4f86-8816-c7239bf8b682/GenerateToken', {
        method: 'POST',
        headers : {
          ' Content-Type' : 'application/json',
           'Authorization' :' Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCIsImtpZCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNjA0ZjFhOTYtY2JlOC00M2Y4LWFiYmYtZjhlYWY1ZDg1NzMwLyIsImlhdCI6MTcyNDMzNTExNywibmJmIjoxNzI0MzM1MTE3LCJleHAiOjE3MjQzNDAwMTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUEvMlJBN2Z6TFNDWlZ1b2xDMjdrcDd1dXIvUmtHT1NnVktXc3VKcU1rZWtBRmcwMUd2VzlLZU16dmh5VzFmN0cvMUg4NnUxMVkrb1RXQTV4aWtpbUlQMjMvdkY1TU5zTXpxYTdRbFgydEVXQT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJORUZaSSIsImdpdmVuX25hbWUiOiJUYXNuaW0iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxOTYuMjMxLjEwMy4xMTciLCJuYW1lIjoiVGFzbmltIE5FRlpJIiwib2lkIjoiMzQxNjFlNjYtNzJjZC00OTBkLTljZWYtNmE2Yzg3NzA5ZmIxIiwicHVpZCI6IjEwMDMyMDAzMDlCODhDQjAiLCJyaCI6IjAuQVRvQWxocFBZT2pMLUVPcnZfanE5ZGhYTUFrQUFBQUFBQUFBd0FBQUFBQUFBQUE2QUY0LiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIEl0ZW0uRXhlY3V0ZS5BbGwgSXRlbS5FeHRlcm5hbERhdGFTaGFyZS5BbGwgSXRlbS5SZWFkV3JpdGUuQWxsIEl0ZW0uUmVzaGFyZS5BbGwgT25lTGFrZS5SZWFkLkFsbCBPbmVMYWtlLlJlYWRXcml0ZS5BbGwgUGlwZWxpbmUuRGVwbG95IFBpcGVsaW5lLlJlYWQuQWxsIFBpcGVsaW5lLlJlYWRXcml0ZS5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgUmVwcnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLkdpdENvbW1pdC5BbGwgV29ya3NwYWNlLkdpdFVwZGF0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic3ViIjoiQXFZVTdxNk1TUEtGT0NyLU9UV2Q2R3BXWks4N1RFREVVdWtTVXV2TFU1WSIsInRpZCI6IjYwNGYxYTk2LWNiZTgtNDNmOC1hYmJmLWY4ZWFmNWQ4NTczMCIsInVuaXF1ZV9uYW1lIjoidGFzbmltLm5lZnppQGVzcHJpdC50biIsInVwbiI6InRhc25pbS5uZWZ6aUBlc3ByaXQudG4iLCJ1dGkiOiJzWlpZakNYencwR0xTX1AtME9WYkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiOCAxIiwieG1zX3BsIjoiZW4tR0IifQ.NaNBW3DSf-BVXNfixJ9Y7DWuV8IpjQmxPVFVj13W8NvqB_-_QlCksGhvKti_KNnR0y3Il-i2QUBpQOqyxX4JFNxPsUcR0SX7nUfpNRz1oe_SyqF5tgwGz5-owo2Grl4Cng27iQrSrQkPMjMS2a11oLEs3cftawBIk5WZTpXvLDCel2gmgFcJEaqNmyarjZ2dPy-X421hlQ9ZUOpDHz_vCmJcFOWbtqsmVVltFIVjZ3DtHJKrWO2NVFkadQx1wvIJmWGrAv5VORY27wdfvubk9iFSyLIPmyU-hGWsy8RQaTfTu3yP6XZ99f9f9okaVygtjviY1G-poZi1gxpgoxE-Mg'
         },
        body: JSON.stringify({
          "accessLevel": "View",
          "datasetId": "7fb8ab51-636d-447a-87c4-84ba4886c3de"
        
        })
    });

    if (!response.ok) {
        throw new Error('Failed to generate token');
    }

    const data = await response.json();
    return data.token; // Return the new token
}

  return(<>
  
  <Header></Header>

  <iframe title="planningReact" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=16c6947f-2e64-4f86-8816-c7239bf8b682&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730" frameborder="0" allowFullScreen="true"></iframe>
  
  </>
   
 
  )



  
}
/* //< PowerBIEmbed
/*	embedConfig = {{
		type: 'report',   
		id: '16c6947f-2e64-4f86-8816-c7239bf8b682',
		embedUrl: "https://app.powerbi.com/reportEmbed?reportId=16c6947f-2e64-4f86-8816-c7239bf8b682&groupId=994434c4-d12f-4635-b106-8083d442db22&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1JLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
		accessToken:"H4sIAAAAAAAEAB2Tta7sVgAA_-W2jrRmiPQKMzOt3R3jmnFNUf49V-mnGs388-OAu59A8fP3jwuoJvctZSLvPmCp5jwZUkwwIG8rvGXs7uvPyDWeYI-QfI_RkTdx40KDfBQ8N5WJMkC4anRxi4c0hpO26Mie7pxZTzPxPZbT9z6HdwbTwAm4LcqCyQXwBB8wwJY9C6vQusLr4DfP72eVlGkk4vjh7cv21MrZXviL5qufhTKWJgZVz710cym-0SJ2LIXniVln-eElpcLuvCY7BkpJgb3jG4NQo12pYO-g9CxUFYiw91of5Y0PhbKWzEQ1cxAYkv3V3QW8v8SF9IrGU4ul9_E8f0p-o16EAuncnETf3W62aIQltrqgdmLTJngzQnDhEtMpUxI_F1TjFa4xTTaEXHL67muoIA7VCb0mRVzMXI6Lomva_GfFrrK3-BkiUV-099tYXcJ6uu_uLhbMZ97RqptiuN4BhEm1yBGDWoI1j1ha3KuFqfQtV7jcuNaqOOFgi0zOnimWPUrjp52LTIb8SXIHLq6aC4iUrTyoKMQkmuMLCtecxPen_Vw95_mJKFtwmU7zJrTR7aySYbsxE3AB7XQuEVHwkTlDMAOU5gU6Du5h2arRsy30VRDXfYkFIdvu1Sg1Lfqpqsu8HmKWnW_gZZpdPBuOrsT9rMBBawgQK6TkY8l5TMLS9zO9zd4cjbXzR_FRC_y5UtV9bUgyiaPRQAnlJFnxioSi4GH3NHVU5FSqdd4OrR4lyl2yox9f2-ZXiF7SRKVEe44aqZyQHlIg0o6G_HJpvDturCZPjGVOq6YEMYX4EXH__Pz1w6_3vE96ef-mfyS7nq18s_GfGLCttIyMWhbBDfhP21mGiKoLyrNjT7bjGmWUbZEbR7ozBsaQAiGZrg-2-JHUOGXpKHVB9EH8WZPLDb1XgWRZAdMrCful1vtFNBSkgEyPjEVb9PFiB-_O30gGwkjBOA23TFeTnHb7govfT5MPUMIy2Nu1mwFWbaqzQ_Q1g6_MtM6ZO6J4IzdvHjbIx1XRhw6gFnKLjfsWz9lQ0ZuatP1T-eIYAuCYRKGfB8CAuMYpweuY5DR1zRe5ilpg_EiYYgQbl95a9VpQrgvK1W7psRONlacUZUSKm-5WFoldBRG5ezY175KHM-IgQ9U8YXE1Ve6Bzugau24Fxrt__td8_160qtGvZTqKWF-IReiQhIuuhTaJPJj9n_KbegT7dy1_sUpm8QeaMPYqmmFnuFAcbkkRcnqQJxMVTilvNcYizymBUsQubY_PdsQz5i7IKxThG60NvLeItQIR6abpqUKUxnYmUHLPuk7IZ3U4XcDryE8Vv2lgSnb91PqXvmoTndfUCvwkrMYaWNHhaylhnoIXjGFvcWgxsCGO9HOVVwudbvWOId-XRwp364cHe1MRG9-rnmgwYTYi52fHdZ2Hewo7G7FRheRf1IOH_t67rupbjkQ2q9Ui3UJLuI1FTUZViZiNZgsODN7s59n2MZiifOcZ7lWwSfz9at_iFSudzHQbbck2ri2kOA6kYKj3MqQLyxL1Pc0MCdSNaBQ_RrzpIz4n8MBc_2r-9z_tucvW7gUAAA==.eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1JLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJleHAiOjE3MjQ0MTIxNTMsImFsbG93QWNjZXNzT3ZlclB1YmxpY0ludGVybmV0Ijp0cnVlfQ==",
		tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
		settings: {
			panes: {
				filters: {
					expanded: false,
					visible: true
				}
			},
			background: models.BackgroundType.Transparent,
		}
	}}

	eventHandlers = {
		new Map([
			['loaded', function () {console.log('Report loaded');}],
			['rendered', function () {console.log('Report rendered');}],
			['error', function (event) {console.log(event.detail);}],
			['visualClicked', () => console.log('visual clicked')],
			['pageChanged', (event) => console.log(event)],
		])
	}

	cssClassName = { "embed-container" }

	getEmbeddedComponent = { (embeddedReport) => {
		window.report = embeddedReport ;
	}}*/

//>*/ 

export default App
