
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export async function getAdminMetrics() {
  try {
    console.log('Starting to fetch admin metrics...');

    // test count
    const { user } = useAuth();
    const { data, error } = await supabase
    .from('customer_details')
    .select('*')
    .eq('user_id', user?.id)
    .single();

    if (error) {
      console.error('Supabase error:', error);
      return {
        totalCustomers: 0,
        newCustomersThisMonth: 0,
        completedMemberships: 0,
        uncompletedMemberships: 0,
        enquiriesThisMonth: 0,
      };
    }

    console.log('Total customers test query result:', { data });

    const totalCustomers = data ? data.length : 0;
    console.log('Total customers 2 test query result:', { totalCustomers });

     

    // Get customers registered this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const { data: newCustomersData, error: newCustomersError } = await supabase
      .from('customer_details')
      .select('*')
      .gte('created_at', startOfMonth.toISOString());
    
    if (newCustomersData) {
      console.log('New customers this month:', newCustomersData.length);
      newCustomersData.forEach((customer, index) => {
        console.log(`New Customer ${index + 1}:`, {
          id: customer.id,
          created_at: customer.created_at
        });
      });
    }

    // Get completed memberships
    const { data: completedMembershipsData, error: completedMembershipsError } = await supabase
      .from('membership_details')
      .select('*')
      .eq('status', true);
    
    if (completedMembershipsData) {
      console.log('Completed memberships:', completedMembershipsData.length);
      completedMembershipsData.forEach((membership, index) => {
        console.log(`Completed Membership ${index + 1}:`, {
          id: membership.id,
          user_id: membership.user_id,
          status: membership.status,
          reference: membership.reference
        });
      });
    }

    // Get uncompleted memberships
    const { data: uncompletedMembershipsData, error: uncompletedMembershipsError } = await supabase
      .from('membership_details')
      .select('*')
      .eq('status', false);
    
    if (uncompletedMembershipsData) {
      console.log('Uncompleted memberships:', uncompletedMembershipsData.length);
      uncompletedMembershipsData.forEach((membership, index) => {
        console.log(`Uncompleted Membership ${index + 1}:`, {
          id: membership.id,
          user_id: membership.user_id,
          status: membership.status,
          reference: membership.reference
        });
      });
    }

    // Get enquiries this month
    const { data: enquiriesData, error: enquiriesError } = await supabase
      .from('membership_details')
      .select('*')
      .gte('created_at', startOfMonth.toISOString());
    
    if (enquiriesData) {
      console.log('Enquiries this month:', enquiriesData.length);
      enquiriesData.forEach((enquiry, index) => {
        console.log(`Enquiry ${index + 1}:`, {
          id: enquiry.id,
          user_id: enquiry.user_id,
          created_at: enquiry.created_at
        });
      });
    }

    // Log the final metrics
    const metrics = {
      totalCustomers: totalCustomers,
      newCustomersThisMonth: newCustomersData?.length || 0,
      completedMemberships: completedMembershipsData?.length || 0,
      uncompletedMemberships: uncompletedMembershipsData?.length || 0,
      enquiriesThisMonth: enquiriesData?.length || 0,
    };
    
    console.log('Final metrics:', metrics);
    
    return metrics;
  } catch (error) {
    console.error('Error fetching admin metrics:', error);
    return {
      totalCustomers: 0,
      newCustomersThisMonth: 0,
      completedMemberships: 0,
      uncompletedMemberships: 0,
      enquiriesThisMonth: 0,
    };
  }
} 