package com.cibertec.servicepdf;

import org.springframework.stereotype.Service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import com.cibertec.dto.OrderDetailDto;

@Service
public class OrderPdfService {

	public byte[] generarPdf(OrderDetailDto order) {
        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);

            document.open();
            document.add(new Paragraph("Detalle de Orden"));
            document.add(new Paragraph("Cliente: " + order.getUserNombre()));
            document.add(new Paragraph("Fecha: " + order.getFecha()));
            document.add(new Paragraph("Estado: " + order.getStatus()));
            document.add(new Paragraph("Total: " + order.getTotal()));

            document.add(new Paragraph("\nProductos:"));
            for (var item : order.getItems()) {
                document.add(new Paragraph("- " + item.getProductNombre() +
                        " x" + item.getCantidad() + " = " + item.getPrecio()));
            }

            document.add(new Paragraph("\nPagos:"));
            if (order.getPagos() != null) {
                for (var pago : order.getPagos()) {
                    document.add(new Paragraph("- Monto: " + pago.getMonto() + " | Método: " + pago.getMetodo()));
                }
            }

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error al generar el PDF :V", e);
        }
    }
	
}