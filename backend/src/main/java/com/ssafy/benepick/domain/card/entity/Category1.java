package com.ssafy.benepick.domain.card.entity;

import java.util.List;

import com.ssafy.benepick.domain.mydata.entity.MyDataCard;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category1 {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long category1Id;

	@Column(nullable = false)
	private String category1Name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "card_code" , nullable = false)
	private Card card;

	@OneToMany(mappedBy = "category1", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Category2> category2List;
}
