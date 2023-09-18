package com.ssafy.benepick.mydata.domain.mydata.repository;

import com.ssafy.benepick.mydata.domain.mydata.entity.MyDataCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MyDataCardRepository extends JpaRepository<MyDataCard, String> {
    @Query("SELECT m FROM MyDataCard m WHERE m.myDataUser.myDataUserId = :userId AND m.card.cardCompany.cardCompanyId = :companyId")
    List<MyDataCard> findByUserIdAndCompanyId(@Param("userId") String userId, @Param("companyId") Long companyId);
}
