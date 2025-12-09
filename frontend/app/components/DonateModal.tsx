'use client'

import React, {useEffect, useState} from 'react'
import {Image} from 'next-sanity/image'
import {urlForImage} from '@/sanity/lib/utils'
import { getImageDimensions } from '@sanity/asset-utils';

type BankOption = {
  name: string
  url?: string
  backgroundColor?: string
  textColor?: string
  bankLogo?: any
}

type DonateModalProps = {
  open: boolean
  onClose: () => void
  banks?: BankOption[]
}

export default function DonateModal({open, onClose, banks}: DonateModalProps) {
  const [senderName, setSenderName] = useState('Анонимный')
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full md:max-w-xl bg-white rounded-t-2xl md:rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Выберите свой банк</h2>
            <p className="text-sm text-gray-600 mt-1">Заполните данные и выберите банк для платежа</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
          <input
            type="text"
            value={senderName}
            onChange={(event) => setSenderName(event.target.value)}
            placeholder="Введите ваше имя"
            className="w-full rounded-lg border border-gray-200 px-3 py-3 focus:border-primary-500 focus:ring-primary-500 outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 mb-4">
          {banks && banks.map((bank) => {
            const style: React.CSSProperties = {
              background: bank.backgroundColor,
              color: bank.textColor,
            }

            // Incoming bg and text color
            // console.log(style)
            // {backgroundColor: "linear-gradient(135deg, #40E0D0, #00CED1)", color: "white"}// 

            const imageDimensions = bank?.bankLogo?.asset?._ref 
              ? getImageDimensions(bank.bankLogo.asset._ref)
              : null;

            const containerHeight = 36; // h-9 = 36px
            const imageHeight = containerHeight * 0.8; // 80% от высоты контейнера
            const aspectRatio = imageDimensions 
              ? imageDimensions.width / imageDimensions.height 
              : 1;
            const scaledWidth = imageHeight * aspectRatio;

            const content = bank?.bankLogo?.asset?._ref && imageDimensions ? (
              <div className="flex items-center justify-center gap-3 cursor-pointer">
                <div 
                  className="relative mr-3 flex-shrink-0" 
                  style={{ 
                    width: `${scaledWidth}px`, 
                    height: `${imageHeight}px` 
                  }}
                >
                  <Image
                    alt={bank?.bankLogo?.asset?.alt || bank.name || 'Bank logo'}
                    className="object-contain"
                    fill
                    sizes={`${Math.round(scaledWidth)}px`}
                    quality={100}
                    src={
                      urlForImage(bank?.bankLogo)
                        ?.width(Math.round(scaledWidth * 2))
                        ?.height(Math.round(imageHeight * 2))
                        ?.fit('max')
                        .url() as string
                    }
                  />
                </div>
              </div>
            ) : (
              <span className="text-sm text-gray-600">By</span>
            );
            
          
            
            return bank.url ? (
              <a
                key={bank.name}
                href={bank.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-center hover:border-primary-400 hover:bg-primary-50 transition"
                style={style}
              >
                {content}
              </a>
            ) : (
              <div
                key={bank.name}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-center hover:border-primary-400 hover:bg-primary-50 transition"
                style={style}
              >
                {content}
              </div>
            )
          })}
        </div>

        <p className="text-xs text-gray-500">
          Нажимая кнопку банка вы принимаете{' '}
          <a href="/terms" className="text-primary-700 hover:underline">
            условия соглашения
          </a>
        </p>
      </div>
    </div>
  )
}

