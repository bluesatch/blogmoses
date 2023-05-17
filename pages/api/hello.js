const handler =(req, res)=> {
    res.status(200).json({ text: 'Waddup'})
}

/**
 * Handling form input 
 * 
 * export default function handler(req, res) {
 *  const email = req.body.email
 * }
 */

export default handler