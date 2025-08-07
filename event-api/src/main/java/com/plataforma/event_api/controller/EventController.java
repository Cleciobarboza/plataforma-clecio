package com.plataforma.event_api.controller;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.plataforma.event_api.dtos.EventDTO;
import com.plataforma.event_api.model.EventModel;
import com.plataforma.event_api.repository.EventRepository;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping("/recent")
    public ResponseEntity<List<EventDTO>> getRecentEvents() {
        List<EventModel> recentEvents = eventRepository.findTop10ByOrderByTimestampDesc();
        
        List<EventDTO> dtos = recentEvents.stream()
            .map(event -> new EventDTO(event.getDescription(), event.getTimestamp()))
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }
    
    // Endpoint para outros serviços registrarem eventos
    @PostMapping
    public ResponseEntity<EventModel> createEvent(@RequestBody EventModel event) {
        EventModel savedEvent = eventRepository.save(event);
        return ResponseEntity.ok(savedEvent);
    }
}