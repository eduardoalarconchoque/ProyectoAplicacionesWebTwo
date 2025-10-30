package com.cibertec.controller;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cibertec.dto.OrderDetailDto;
import com.cibertec.service.customer.CustomerService;
import com.cibertec.servicepdf.OrderPdfService;

@RestController
@RequestMapping("/api/pdf")
public class OrderPdfController {

	private final OrderPdfService orderPdfService;
	
    private final CustomerService customerService;

    public OrderPdfController(OrderPdfService orderPdfService, CustomerService customerService) {
        this.orderPdfService = orderPdfService;
        this.customerService = customerService;
    }

    @GetMapping("/orden/{orderId}/usuario/{userId}")
    public ResponseEntity<byte[]> descargarOrdenPdf(@PathVariable Long orderId, @PathVariable Long userId) {
        OrderDetailDto order = customerService.getOrderDetail(orderId, userId);

        if (order == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }

        byte[] pdfBytes = orderPdfService.generarPdf(order);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition
                .attachment()
                .filename("orden_" + orderId + ".pdf")
                .build());

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}