package com.ssafy.benepick.domain.user.repository;

import com.ssafy.benepick.domain.user.entity.UserCardBenefit;
import com.ssafy.benepick.domain.user.entity.UserCardCategory1;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserCardBenefitRepository extends JpaRepository<UserCardBenefit,Long > {
    List<UserCardBenefit> findByUserCardCategory1(UserCardCategory1 userCardCategory1);
}
