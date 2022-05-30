import { useState } from "react";


import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackTypesStep } from "./Steps/FeedbackTypesStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes = {
  BUG: {
    title: 'Problemas', 
    image: {
      source: bugImageUrl, 
      alt: 'Imagem de um inseto'
    }
  }, 
  IDEA: {
    title: "Idéias", 
    image: {
      source: ideaImageUrl, 
      alt: 'Imagem de uma lampada'
    }
  }, 
  OTHER: {
    title: "Outros", 
    image: {
      source: thoughtImageUrl, 
      alt: 'Imagem de balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm(){

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback(){
    setFeedbackSent(false)
    setFeedbackType(null)
  }
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto"> 

      {
        feedbackSent ? (
          <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
        ) : (
          <>
             {
              !feedbackType ? (
                <FeedbackTypesStep onFeedbackTypeChanged={setFeedbackType} />
              ) : (
                <FeedbackContentStep 
                  feedbackType={feedbackType}
                  onFeedbackRestartRequested={handleRestartFeedback}
                  onFeedbackSent={() => setFeedbackSent(true)}
                />
              )
            }
          </>
        )
      }
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a href="#" className="underline underline-offset-2">Thiago</a>
      </footer>
    </div>
  )
}