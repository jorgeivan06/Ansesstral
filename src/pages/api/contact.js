
// api/contact.js - ARCHIVO ACTUALIZADO
import nodemailer from 'nodemailer';
import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';

export async function POST({ request }) {
    try {
        const { name, email, reason, message } = await request.json();
        
        // Validaciones (MANTENER tus validaciones actuales)
        if (!name || !email || !message) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Por favor completa todos los campos requeridos' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ 
                success: false, 
                message: 'Email inválido' 
            }), { 
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        
        // ✅ NUEVO: Configurar Dropbox
        const dbx = new Dropbox({ 
            accessToken: import.meta.env.DROPBOX_ACCESS_TOKEN,
            fetch: fetch
        });
        
        // ✅ NUEVO: Guardar datos en Dropbox
        const datosFormulario = {
            nombre: name,
            email: email,
            motivo: reason,
            mensaje: message,
            fecha: new Date().toISOString(),
            origen: "Portafolio Ansestral",
            timestamp: Date.now()
        };
        
        const nombreArchivo = `contacto_${name.replace(/\s+/g, '_')}_${Date.now()}.json`;
        const rutaDropbox = `/Ansestral/formularios-contacto/${nombreArchivo}`;
        
        await dbx.filesUpload({
            path: rutaDropbox,
            contents: JSON.stringify(datosFormulario, null, 2),
            mode: { '.tag': 'add' },
            autorename: true
        });
        
        console.log('✅ Datos guardados en Dropbox:', nombreArchivo);
        
        // ✅ MANTENER tu código actual de nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: import.meta.env.EMAIL_USER,
                pass: import.meta.env.EMAIL_PASS
            }
        });
        
        const reasonMap = {
            'consulta': 'Consulta sobre servicios',
            'ritual': 'Información sobre productos',
            'ancestralidad': 'Conocimientos ancestrales',
            'otro': 'Otro motivo'
        };
        
        // Email principal
        await transporter.sendMail({
            from: import.meta.env.EMAIL_USER,
            to: 'manjarjorgeivan@gmail.com',
            subject: `Nuevo contacto - ${reasonMap[reason] || reason}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Motivo:</strong> ${reasonMap[reason] || reason}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <p><em>Datos guardados automáticamente en Dropbox</em></p>
            `
        });
        
        // Email de confirmación
        await transporter.sendMail({
            from: import.meta.env.EMAIL_USER,
            to: email,
            subject: 'Mensaje recibido - Portafolio Ancestral',
            html: `
                <h2>¡Gracias por contactarnos, ${name}!</h2>
                <p>Hemos recibido tu mensaje y te responderemos pronto.</p>
                <p><strong>Tu mensaje:</strong> ${message}</p>
            `
        });
        
        return new Response(JSON.stringify({ 
            success: true, 
            message: 'Mensaje enviado exitosamente y datos guardados en la nube' 
        }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ 
            success: false, 
            message: 'Error al procesar el formulario' 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}