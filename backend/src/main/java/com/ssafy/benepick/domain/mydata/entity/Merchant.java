package com.ssafy.benepick.domain.mydata.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "merchant" , schema = "benepick_bank")
public class Merchant {

	@Id
	@Column(name = "merchant_id")
	private Long merchantId;

	@Column(nullable = false , name = "merchant_name")
	private String merchantName;

	@Column(nullable = false , name = "merchant_category1")
	private String merchantCategory1;

	@Column(nullable = false , name = "merchant_category2")
	private String merchantCategory2;

	@Column(nullable = false , name = "merchant_category3")
	private String merchantCategory3;

	@Column(nullable = false , name = "merchant_x")
	private float merchantX;

	@Column(nullable = false , name = "merchant_y")
	private float merchantY;

}
