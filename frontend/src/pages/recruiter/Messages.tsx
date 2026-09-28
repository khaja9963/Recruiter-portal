import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  CheckCheck,
  Building2,
  User,
  Clock,
  Sparkles
} from 'lucide-react';
import { useRecruiterStore } from '../../store/recruiterStore';

interface MessageItem {
  id: string;
  sender: 'recruiter' | 'candidate';
  senderName: string;
  content: string;
  time: string;
  attachments?: string[];
}

interface Conversation {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateTitle: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: boolean;
  messages: MessageItem[];
}

export const Messages: React.FC = () => {
  const { organizationId = 'clyptus' } = useParams<{ organizationId: string }>();
  const { profile } = useRecruiterStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  const [inputText, setInputText] = useState('');

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'conv-1',
      candidateId: 'cand-01',
      candidateName: 'Alex Rivera',
      candidateTitle: 'Senior Frontend Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      lastMessage: 'Hi Sarah, Wednesday afternoon works perfectly for me!',
      lastTime: '11:30 AM',
      unread: false,
      messages: [
        {
          id: 'm1',
          sender: 'recruiter',
          senderName: profile.name,
          content: 'Hello Alex! We were really impressed by your background in React performance and would love to schedule a technical round.',
          time: '10:15 AM'
        },
        {
          id: 'm2',
          sender: 'candidate',
          senderName: 'Alex Rivera',
          content: 'Hi Sarah, thank you for reaching out! I would be thrilled to speak with the engineering team. Wednesday afternoon works perfectly for me!',
          time: '11:30 AM'
        }
      ]
    },
    {
      id: 'conv-2',
      candidateId: 'cand-02',
      candidateName: 'Marcus Chen',
      candidateTitle: 'Lead Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      lastMessage: 'The offer package looks very competitive. Reviewing the details.',
      lastTime: 'Yesterday',
      unread: true,
      messages: [
        {
          id: 'm3',
          sender: 'recruiter',
          senderName: profile.name,
          content: 'Hi Marcus, the hiring committee has approved your offer letter! I have attached the compensation and benefits package.',
          time: 'Yesterday, 3:00 PM',
          attachments: ['clyptus_offer_package_marcus.pdf']
        },
        {
          id: 'm4',
          sender: 'candidate',
          senderName: 'Marcus Chen',
          content: 'The offer package looks very competitive. Reviewing the details with my family and will get back to you shortly.',
          time: 'Yesterday, 4:45 PM'
        }
      ]
    },
    {
      id: 'conv-3',
      candidateId: 'cand-03',
      candidateName: 'Elena Rostova',
      candidateTitle: 'Staff DevOps Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      lastMessage: 'Looking forward to our screening call.',
      lastTime: 'Sep 26',
      unread: false,
      messages: [
        {
          id: 'm5',
          sender: 'recruiter',
          senderName: profile.name,
          content: 'Hi Elena, confirming our preliminary screening call for Monday at 10 AM PST.',
          time: 'Sep 26, 2:10 PM'
        },
        {
          id: 'm6',
          sender: 'candidate',
          senderName: 'Elena Rostova',
          content: 'Confirmed! Looking forward to our screening call.',
          time: 'Sep 26, 2:30 PM'
        }
      ]
    }
  ]);

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: 'recruiter',
      senderName: profile.name,
      content: inputText.trim(),
      time: 'Just now'
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            lastMessage: newMsg.content,
            lastTime: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    setInputText('');
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.candidateTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" /> Recruiter-Candidate Messaging
        </h1>
        <p className="text-xs text-slate-500">
          Direct candidate outreach, interview logistics, and status coordination for {organizationId.toUpperCase()}
        </p>
      </div>

      {/* Two-Column Chat Container */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs h-[640px] flex overflow-hidden">
        {/* Left: Conversation List */}
        <div className="w-80 border-r border-slate-200 flex flex-col shrink-0 bg-slate-50/50">
          <div className="p-3 border-b border-slate-200">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConversationId;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConversationId(conv.id);
                    setConversations((prev) =>
                      prev.map((c) => (c.id === conv.id ? { ...c, unread: false } : c))
                    );
                  }}
                  className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors ${
                    isSelected ? 'bg-blue-50/70 border-l-4 border-l-blue-600' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <img
                    src={conv.avatar}
                    alt={conv.candidateName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                  />
                  <div className="overflow-hidden flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 truncate">{conv.candidateName}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">{conv.lastTime}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate font-medium">{conv.candidateTitle}</div>
                    <div className="text-[11px] text-slate-600 truncate mt-1 flex items-center gap-1">
                      {conv.unread && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>}
                      <span className={conv.unread ? 'font-semibold text-slate-900' : 'text-slate-500'}>
                        {conv.lastMessage}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Message Thread */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Thread Header */}
          <div className="p-3.5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeConv.avatar}
                alt={activeConv.candidateName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900">{activeConv.candidateName}</h3>
                <span className="text-xs text-slate-500">{activeConv.candidateTitle}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                Active Candidate
              </span>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/30">
            {activeConv.messages.map((msg) => {
              const isMe = msg.sender === 'recruiter';
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[11px] font-semibold text-slate-600">{msg.senderName}</span>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                  </div>
                  <div
                    className={`max-w-md px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-xs shadow-2xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    {msg.content}

                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-blue-500/30 space-y-1">
                        {msg.attachments.map((att) => (
                          <div key={att} className="flex items-center gap-1.5 text-[11px] bg-blue-700/40 p-1.5 rounded text-white">
                            <Paperclip className="w-3.5 h-3.5" />
                            <span className="truncate">{att}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <button
              type="button"
              title="Attach File"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Send message to ${activeConv.candidateName}...`}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
