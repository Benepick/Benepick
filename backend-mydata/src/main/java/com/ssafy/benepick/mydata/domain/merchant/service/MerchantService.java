package com.ssafy.benepick.mydata.domain.merchant.service;

import com.ssafy.benepick.mydata.domain.merchant.dto.response.ApiMerchantResponseDto;
import com.ssafy.benepick.mydata.domain.merchant.entity.Merchant;

public interface MerchantService {
    ApiMerchantResponseDto findNearestMerchant(double x, double y);
}
