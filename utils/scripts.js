

const sendWhatsappMessage = ({ numero, path=null, text }) => {
    let url = `https://api.whatsapp.com/send?phone=57${numero}`;
    url += `&text=${encodeURI(text?text:`Buen dia, encontre su taller en https://quarks.com.co${path}, tengo el siguiente problema...`)}&app_absent=0`
    window.open(url);
}

export default sendWhatsappMessage