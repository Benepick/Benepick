package com.ssafy.benepick.domain.card.entity;

import java.util.List;

import com.ssafy.benepick.domain.card.dto.response.CardCompanyResponseDto;
import com.ssafy.benepick.domain.mydata.entity.MyDataCard;
import com.ssafy.benepick.domain.mydata.entity.MyDataPayment;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "card_company" , schema = "benepick_bank")
public class CardCompany {

	@Id
	@Column(name = "card_company_id")
	private Long cardCompanyId;

	@Column(nullable = false , name = "card_company_img_url")
	private String cardCompanyImgUrl;

	@Column(nullable = false , name = "card_company_name")
	private String cardCompanyName;

	@OneToMany(mappedBy = "cardCompany", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Card> cardList;

	public CardCompanyResponseDto toCardCompanyResponseDtoForSignUp(){
		return CardCompanyResponseDto.builder()
			.cardCompanyId(cardCompanyId)
			.cardCompanyImgUrl(cardCompanyImgUrl)
			.cardCompanyName(cardCompanyName)
			.isLinked(false)
			.isSelected(true)
			.build();
	}

	public CardCompanyResponseDto toCardCompanyResponseDto(boolean isLinked){
		return CardCompanyResponseDto.builder()
			.cardCompanyId(cardCompanyId)
			.cardCompanyImgUrl(cardCompanyImgUrl)
			.cardCompanyName(cardCompanyName)
			.isLinked(isLinked)
			.isSelected(isLinked ? true : false)
			.build();
	}
}
