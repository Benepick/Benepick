package com.ssafy.benepick.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.benepick.domain.user.entity.UserCardCompany;

public interface UserCardCompanyRepository extends JpaRepository<UserCardCompany , Long> {
}
