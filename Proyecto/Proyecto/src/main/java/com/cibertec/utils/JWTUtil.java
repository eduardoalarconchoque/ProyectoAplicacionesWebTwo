package com.cibertec.utils;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
	
	   @Value("${jwt.secret}")  
	    private String secretKey;
	
   public String extractUserName(String token) {
	   return extractClaim(token, Claims::getSubject);
   }
   
   public String generateToken(UserDetails userDetails) {
	   return generateToken (new HashMap<>(), userDetails); 
   }
   
   public boolean isTokenValid(String token, UserDetails userDetails) {
	   final String userName = extractUserName(token);
	   return (userName.equals(userDetails.getUsername())) && !isTokenExpired(token);
   }
   
   private <T> T extractClaim (String token , Function<Claims, T> claimsResolvers) {
	   final Claims claims =extractAllClaims(token);
	   return claimsResolvers.apply(claims);
	   
   }
   
   

   // Método para generar el token, incluyendo los roles
   private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
       // Agregar los roles del usuario al token
       extraClaims.put("roles", userDetails.getAuthorities().stream()
               .map(authority ->authority.getAuthority()) // Extraemos el rol del authority
               .toArray(String[]::new));

       return Jwts.builder()
               .setClaims(extraClaims)
               .setSubject(userDetails.getUsername())
               .setIssuedAt(new Date(System.currentTimeMillis()))
               .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24)) // Expiración de 24 horas
               .signWith(getSigningKey(), SignatureAlgorithm.HS256)
               .compact();
   }


   public String generatedRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails) {
	   return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
			   .setIssuedAt(new Date(System.currentTimeMillis()))
			   .setExpiration(new Date(System.currentTimeMillis() + 604800000))
			   .signWith(getSigningKey(),SignatureAlgorithm.HS256).compact();
  }
   
   private boolean isTokenExpired(String token ) {
	   return extractExpiration(token).before(new Date());
   }

     private Date extractExpiration(String token) {
	// TODO Auto-generated method stub
	return extractClaim(token, Claims::getExpiration);
     }
     
     public Claims extractAllClaims(String token) {
    	    return Jwts.parserBuilder()
    	            .setSigningKey(getSigningKey())
    	            .build()
    	            .parseClaimsJws(token)
    	            .getBody();
    	}

     
     private Key getSigningKey() {
    	                                           //--@luffyF123+@topi_Secure00;!_----//
    	 byte[]keyBytes = Decoders.BASE64.decode(secretKey);
    	 return Keys.hmacShaKeyFor(keyBytes);
     }
}
