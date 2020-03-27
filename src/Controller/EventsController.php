<?php

namespace App\Controller;

use App\Entity\Event;
use App\Forms\EventFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class EventsController extends AbstractController
{
    /**
     * @Route("/bevents")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $events = $em->getRepository(Event::class)->findAll();

        return $this->render('events/index.html.twig', [
            'events' => $events,
        ]);
    }
    /**
     * @Route(name="new_event", path="/bevents/new")
     */
    public function newAction(Request $request)
    {
        return $this->defaultForm($request, new Event());
    }

    /**
     * @Route(name="edit_event", path="/bevents/{id}")
     */
    public function editAction(string $id, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $event = $em->getRepository(Event::class)->find($id);

        return $this->defaultForm($request, $event);
    }

    private function defaultForm(Request $request, Event $event)
    {
        $form = $this->createForm(EventFormType::class, $event);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $event = $form->getData();

            $em = $this->getDoctrine()->getManager();
            $em->persist($event);
            $em->flush();
            return $this->redirectToRoute("edit_event", ["id" => $event->getId()]);
        }
        return $this->render('events/edit.html.twig', [
            'event' => $event,
            'form' => $form->createView(),
        ]);
    }
}
