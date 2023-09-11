package com.ssafy.benepick.domain.mydata.entity;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.benepick.domain.card.entity.Card;
import com.ssafy.benepick.domain.card.entity.CardCompany;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "mydata_card" , schema = "benepick_bank")
public class MyDataCard {

	@Id
	@Column(name = "mydata_card_id")
	private String myDataCardId;

	@Column(nullable = false , name = "mydata_card_expiration_date")
	private LocalDate myDataCardExpirationDate;

	@Column(nullable = false , name = "mydata_card_prev_month_amount")
	private int myDataCardPrevMonthAmount;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "my_data_user_id" , nullable = false)
	private MyDataUser myDataUser;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "card_code" , nullable = false)
	private Card card;

	@OneToMany(mappedBy = "myDataCard", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<MyDataPayment> myDataPaymentList;
}
