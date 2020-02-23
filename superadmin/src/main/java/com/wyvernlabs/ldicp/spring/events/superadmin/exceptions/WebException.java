package com.wyvernlabs.ldicp.spring.events.superadmin.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR, reason="Bad request")  // 404
public class WebException extends RuntimeException {

}
