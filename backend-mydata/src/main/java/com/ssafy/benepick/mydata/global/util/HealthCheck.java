package com.ssafy.benepick.mydata.global.util;

import com.ssafy.benepick.mydata.global.response.ResponseResult;
import com.ssafy.benepick.mydata.global.response.SingleResponseResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/health-check")
public class HealthCheck {
    @GetMapping
    public ResponseResult checkServerStatus(){
        log.info("jenkins health check 요청");
        return new SingleResponseResult<>(true);
    }
}
