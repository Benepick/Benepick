package com.ssafy.benepick.domain.user.entity;

import java.time.LocalDate;
import java.util.List;

import com.ssafy.benepick.domain.user.dto.response.UserCardResponseDto;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Table(name = "user_card" , schema = "benepick")
public class UserCard {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_card_id")
	private Long userCardId;

	@Column(nullable = false , name = "user_card_code")
	private Long userCardCode;

	@Column(nullable = false , name = "user_card_name")
	private String userCardName;

	@Column(nullable = false , name = "user_card_expiration_date")
	private LocalDate userCardExpirationDate;

	@Column(nullable = false , name = "user_card_company_name")
	private String userCardCompanyName;

	@Column(nullable = false , name = "user_card_img_url")
	private String userCardImgUrl;

	@Column(nullable = false , name = "user_card_company_img_url")
	private String userCardCompanyImgUrl;

	@Column(nullable = false , name = "user_card_serial_number")
	private String userCardSerialNumber;

	@Column(nullable = false , name = "user_card_current_performance")
	private int userCardCurrentPerformance;

	@Column(nullable = false , name = "user_card_prev_performance")
	private int userCardPrevPerformance;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id" , nullable = false)
	private User user;

	@OneToMany(mappedBy = "userCard", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserPayment> userPaymentList;

	@OneToMany(mappedBy = "userCard", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<UserCardCategory1> userCardCategory1List;

	public UserCardResponseDto toUserCardResponseDto (List<Integer> userCardPerformanceLevels, int userCardCurrentLevel, int nextLevelAmount){
		return UserCardResponseDto.builder()
				.serialNumber(userCardSerialNumber)
				.cardName(userCardName)
				.currentPerformance(userCardCurrentPerformance)
				.cardImgUrl(userCardImgUrl)
				.cardCode(userCardCode)
				.expirationDate(userCardExpirationDate)
				.cardCompanyName(userCardCompanyName)
				.performanceLevels(userCardPerformanceLevels)
				.currentLevel(userCardCurrentLevel)
				.nextLevelAmount(nextLevelAmount)
				.build();
	}
}
