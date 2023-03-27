export default async function sendMessage ({number, titulo}){
    await fetch(`https://wha-api.up.railway.app/hi`,
    {
      method: "POST",
    //   mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },// *GET, POST, PUT, DELETE, etc.
      // referrerPolicy: "no-referrer",
      body: JSON.stringify({ number, titulo})
    }).then(res=> {
      console.log(res);
    }).catch(err=> console.log(err))
  }