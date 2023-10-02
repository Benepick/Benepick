package com.ssafy.benepick.mydata.domain.merchant.repository;
import com.ssafy.benepick.mydata.domain.merchant.entity.Merchant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MerchantRepository extends JpaRepository<Merchant, Long> {
    @Query(value = "SELECT * FROM merchant " +
            "WHERE merchant_x_int = :ptx-1 " +
            "AND merchant_x BETWEEN :x-1 AND :x+1 " +
            "AND merchant_y BETWEEN :y-1 AND :y+1 " +
            "ORDER BY SQRT(POW(merchant_x - :x, 2) + POW(merchant_y - :y, 2)) ASC " +
            "LIMIT 1",
            nativeQuery = true)
    Merchant findNearestMerchant(@Param("x") double x, @Param("y") double y , @Param("ptx") int ptx);
}
