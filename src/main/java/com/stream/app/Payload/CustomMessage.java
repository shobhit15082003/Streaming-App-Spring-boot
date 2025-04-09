package com.stream.app.Payload;

import lombok.*;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class CustomMessage {
    private String message;
    private boolean success=false;
    private HttpStatus httpStatus;
}
