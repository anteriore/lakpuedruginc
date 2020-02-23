package com.wyvernlabs.ldicp.spring.events.superadmin.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.UNAUTHORIZED, reason="UnAuthorized access")  // 404
public class UnAuthorizedException extends RuntimeException {

}
