package com.ssafy.benepick.domain.mydata.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.benepick.domain.mydata.entity.MyDataUser;


public interface MyDataUserRepository extends JpaRepository<MyDataUser, String> {
}
