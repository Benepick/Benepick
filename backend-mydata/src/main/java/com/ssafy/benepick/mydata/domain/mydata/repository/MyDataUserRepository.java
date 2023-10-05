package com.ssafy.benepick.mydata.domain.mydata.repository;

import com.ssafy.benepick.mydata.domain.mydata.entity.MyDataUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyDataUserRepository extends JpaRepository<MyDataUser, String> {
}
