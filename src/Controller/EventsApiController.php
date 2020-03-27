<?php

namespace App\Controller;

use App\Entity\Event;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api")
 */
class EventsApiController extends AbstractController
{
    /**
     * @var SerializerInterface $serializer
     */
    private $serializer;

    public function __construct(SerializerInterface $serializer)
    {
        $this->serializer = $serializer;
    }

    /**
     * @Route("/events", methods={"GET"})
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();
        $events = $em->getRepository(Event::class)->findAll();

        return $this->json($events);
    }

    /**
     * @Route("/events/{id}", methods={"GET"})
     */
    public function showAction(string $id)
    {
        $em = $this->getDoctrine()->getManager();
        $event = $em->getRepository(Event::class)->find($id);

        return $this->json($event);
    }

    /**
     * @Route(path="/events", methods={"POST"})
     */
    public function newAction(Request $request)
    {
        $event = new Event();
        $event = $this->getEventFromRequest($request, $event);
        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();

        return $this->json($event);
    }

    /**
     * @Route(path="/events/{id}", methods={"PUT"})
     */
    public function updateAction(string $id, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $event = $this->getEventFromRequest($request);
        if ((null !== $event->getId()) && ($event->getId() != $id)) {
            throw new Exception("ID mismatch in URL and body");
        } else {
            $event->setId($id);
        }

        $em->merge($event);
        $em->flush();
        return $this->json($event);
    }

    private function getEventFromRequest(Request $request)
    {
        $content = $request->getContent();
        $event = $this->serializer->deserialize($content, Event::class, 'json');
        return $event;
    }
}
