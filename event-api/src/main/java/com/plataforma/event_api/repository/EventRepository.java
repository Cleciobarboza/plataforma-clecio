package com.plataforma.event_api.repository;


import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.plataforma.event_api.model.EventModel;

@Repository
public interface EventRepository extends JpaRepository<EventModel, UUID> {

    List<EventModel> findTop10ByOrderByTimestampDesc();
}